package service

import (
	"gorm.io/gorm"
	"proposals/db"
	"proposals/models"
)

func CreateRecord(record models.Record) (*models.Record, error) {
	err := db.GetProposalsDB().Create(&record).Error
	if err != nil {
		return nil, err
	}

	return &record, nil
}

func GetRecord(proposalId int) (*models.Record, error) {
	var record models.Record
	if err := db.GetProposalsDB().Where("proposal_id = ?", proposalId).First(&record).Error; err != nil {
		return nil, err
	}
	return &record, nil
}

func AuthRecord(proposalId int, participant string) error {
	involve := &models.Involve{
		ProposalId: proposalId,
		Vote:       participant,
	}
	if err := db.GetProposalsDB().
		Where("proposal_id = ? AND participant = ?", proposalId, participant).
		First(&involve).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return err
		}
	}
	return nil
}
