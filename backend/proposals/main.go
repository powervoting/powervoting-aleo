package main

import (
	"io"
	syslog "log"
	"os"
	"proposals/api"
	"proposals/controllers"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	api.RegisterHandlers(r, controllers.Handler{})

	gin.DefaultWriter = io.Writer(os.Stdout)

	err := r.Run(":80")
	if err != nil {
		syslog.Panic("err:", err)
	}
}
