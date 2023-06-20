package postgres

import (
	"fmt"
	"pkg/utils/config"
	"pkg/utils/sync"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var _DB *gorm.DB

var _DB_once sync.RecoverableOnce

func GetPostgresGormDB() *gorm.DB {
	_DB_once.Do(func() {
		// https://github.com/go-gorm/postgres
		db, err := gorm.Open(postgres.New(postgres.Config{
			DSN: fmt.Sprintf("user=%s password=%s dbname=%s port=%s  host=%s sslmode=disable TimeZone=Asia/Shanghai",
				config.C.Postgres.User,
				config.C.Postgres.Password,
				config.C.Postgres.DBName,
				config.C.Postgres.Port,
				config.C.Postgres.Url),
			PreferSimpleProtocol: true, // disables implicit prepared statement usage
		}), &gorm.Config{})
		if err != nil {
			panic(fmt.Errorf("error openning database: %w", err))
		}

		_DB = db
	})

	return _DB
}
