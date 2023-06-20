package controllers

import (
	"github.com/gin-gonic/gin"
)

type BaseResp struct {
	Ok    bool  `json:"ok"`
	Count int64 `json:"count,omitempty"`
	// Message 如果出错则包含错误信息
	Message string      `json:"msg,omitempty"`
	Data    interface{} `json:"data"`
}

func returnData(code int, count int64, data interface{}, c *gin.Context) {
	c.JSON(code, BaseResp{
		Ok:    true,
		Count: count,
		Data:  data,
	})
}
