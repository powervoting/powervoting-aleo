package config

import (
	"log"

	"github.com/caarlos0/env/v8"
)

// Config 配置文件
type Config struct {
	Postgres Postgres `envPrefix:"POSTGRES_"` // PG 数据库配置
}

type Postgres struct {
	User     string `env:"USER" envDefault:"postgres"`
	Password string `env:"PASSWORD" envDefault:"asdiy2w4rg87243"`
	DBName   string `env:"DBNAME" envDefault:"postgres"`
	Port     string `env:"PORT" envDefault:"5432"`
	Url      string `env:"URL" envDefault:"192.168.11.120" `
}

// C 存储全局配置
var C = new(Config)

func init() {
	log.Println("reading config")

	if err := env.Parse(C); err != nil {
		log.Fatalf("parse env %s\n", err.Error())
	}

	// b, err := base64.StdEncoding.DecodeString(C.Auth.Certificate)
	// if err != nil {
	// 	log.Fatalf("failed to parse casdoor Certificate: %s\n", err.Error())
	// }
	// C.Auth.Certificate = string(b)
}
