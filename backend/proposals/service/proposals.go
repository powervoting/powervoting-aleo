package service

import (
	"proposals/db"
	"proposals/models"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func CreateProposals(req models.CreateProposalRequest) (*models.CreateProposalRequest, error) {
	proposalOptions := &models.ProposalOptions{
		ProposalId: req.ProposalId,
		Option:     req.Option,
	}

	proposal := &models.Proposals{
		ProposalId:  req.ProposalId,
		Title:       req.Title,
		Description: req.Description,
		Status:      req.Status,
		Participate: req.Participate,
		StartTime:   req.StartTime,
		EndTime:     req.EndTime,
	}
	tx := db.GetProposalsDB().Begin()

	if err := tx.Create(proposal).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Create(proposalOptions).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	return &req, tx.Commit().Error
}

func GetProposals(proposalId int) (*models.GetProposalRequest, error) {
	var proposals models.GetProposalRequest

	tx := db.GetProposalsDB().Begin()

	if err := tx.Where(" proposal_id = ?", proposalId).First(&proposals).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	var proposalOptions *models.ProposalOptions
	if err := tx.Where(" proposal_id = ?", proposalId).Find(&proposalOptions).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	proposals.Option = proposalOptions.Option

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	return &proposals, nil
}

func ListProposals(page, pageSize int) (*[]models.Proposals, int64, error) {
	var proposals []models.Proposals
	offset := (page - 1) * pageSize
	err := db.GetProposalsDB().
		Offset(offset).
		Limit(pageSize).
		Select("title", "proposal_id", "description", "start_time", "end_time", "status", "participate").
		Find(&proposals).Error
	if err != nil {
		return nil, 0, err
	}

	var count int64
	err = db.GetProposalsDB().Model(&models.Proposals{}).Count(&count).Error
	if err != nil {
		return nil, 0, err
	}

	return &proposals, count, nil
}

func PatchProposals(updateMask models.UpdateProposalsRequest) (models.UpdateProposalsRequest, error) {
	update := db.GetProposalsDB()
	for _, k := range updateMask.UpdateMask {
		switch k {
		case "status", "participate":
			update = update.Select(k)
		default:
			continue
		}
	}

	err := update.Where("proposal_id = ?", updateMask.ProposalId).Updates(updateMask).Error
	if err != nil {
		return models.UpdateProposalsRequest{}, status.Error(codes.Internal, err.Error())
	}

	return updateMask, nil
}
