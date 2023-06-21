package db

import (
	"log"
	"pkg/utils/postgres"
	"proposals/models"
	"sync"

	"gorm.io/gorm"
)

var once sync.Once

func GetProposalsDB() *gorm.DB {
	once.Do(func() {
		err := postgres.GetPostgresGormDB().AutoMigrate(&models.Proposals{},
			&models.ProposalOptions{},
			&models.Involve{},
			&models.Vote{},
			&models.Record{},
			&models.Recevied{})
		if err != nil {
			log.Fatalln("error migrating member: ", err.Error())
		}
	})
	return postgres.GetPostgresGormDB()
}
