package service

import (
	"gorm.io/gorm"
	"proposals/db"
	"proposals/models"
)

func CreateRecevied(recevied models.Recevied) (*models.Recevied, error) {
	err := db.GetProposalsDB().Create(&recevied).Error
	if err != nil {
		return nil, err
	}

	return &recevied, nil
}

func GetRecevied(proposalId int, receiver string) (bool, error) {
	recevied := &models.Recevied{}
	err := db.GetProposalsDB().Where("proposal_id = ? AND receiver = ?", proposalId, receiver).First(recevied).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return false, nil
		}
		return false, err
	}
	return true, nil
}
