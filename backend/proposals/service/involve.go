package service

import (
	"proposals/db"
	"proposals/models"
)

func CreateInvolve(req models.CreateInvolveRequest) (*models.CreateInvolveRequest, error) {
	involve := &models.Involve{
		ProposalId:  req.ProposalId,
		Participant: req.Participant,
	}

	vote := &models.Vote{
		ProposalId: req.ProposalId,
		Vote:       req.Vote,
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

func GetInvolve(proposalId string) (*models.Involve, error) {
	var involve models.Involve

	if err := db.GetProposalsDB().Where(" proposal_id = ?", proposalId).First(&involve).Error; err != nil {
		return nil, err
	}
	return &involve, nil
}
