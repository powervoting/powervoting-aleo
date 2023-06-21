package service

import (
	"gorm.io/gorm"
	"proposals/db"
	"proposals/models"
)

func CreateInvolve(req models.CreateInvolveRequest) (*models.CreateInvolveRequest, error) {
	involve := &models.Involve{
		ProposalId: req.ProposalId,
		Vote:       req.Vote,
	}

	vote := &models.Vote{
		ProposalId:  req.ProposalId,
		Participant: req.Participant,
	}

	tx := db.GetProposalsDB().Begin()

	if err := tx.Create(involve).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Create(vote).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	return &req, tx.Commit().Error
}

func GetInvolve(proposalId int) (*models.Involve, error) {
	var involve models.Involve
	if err := db.GetProposalsDB().
		Where(" proposal_id = ?", proposalId).
		First(&involve).Error; err != nil {
		return nil, err
	}
	return &involve, nil
}
func GetVote(proposalId int, participant string) (bool, error) {
	vote := &models.Vote{}
	err := db.GetProposalsDB().
		Where("proposal_id = ? AND participant = ?", proposalId, participant).
		First(vote).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return false, nil
		}
		return false, err
	}
	return true, nil
}
