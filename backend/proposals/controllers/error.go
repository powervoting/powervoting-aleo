package controllers

import (
	"github.com/gin-gonic/gin"
)

func returnError(code int, message string, err error, c *gin.Context) {
	c.JSON(code, BaseResp{
		Ok:      false,
		Message: message,
	})
	if err != nil {
		_ = c.Error(err)
	}
}
