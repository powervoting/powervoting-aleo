package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"proposals/api"
	"proposals/models"
	"proposals/service"
)

type Handler struct{}

func (h Handler) PostReceived(c *gin.Context) {
	var recevied models.Recevied

	if err := c.ShouldBindJSON(&recevied); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	res, err := service.CreateRecevied(recevied)
	if err != nil {
		returnError(200, err.Error(), err, c)
		return
	}
	returnData(200, 0, res, c)
}

func (h Handler) GetReceivedProposalId(c *gin.Context, proposalId int, params api.GetReceivedProposalIdParams) {
	res, err := service.GetRecevied(proposalId, params.Receiver)
	if err != nil {
		returnError(200, err.Error(), err, c)
		return
	}
	returnData(200, 0, res, c)
}

func (h Handler) GetVoteProposalId(c *gin.Context, proposalId int, params api.GetVoteProposalIdParams) {
	res, err := service.GetVote(proposalId, params.Participant)
	if err != nil {
		returnError(200, err.Error(), err, c)
		return
	}
	returnData(200, 0, res, c)
}

func (h Handler) GetProposalsProposalId(c *gin.Context, proposalId int) {
	res, err := service.GetProposals(proposalId)
	if err != nil {
		returnError(200, err.Error(), err, c)
		return
	}
	returnData(200, 0, res, c)
}

func (h Handler) PatchProposals(c *gin.Context) {
	var updateReq models.UpdateProposalsRequest

	if err := c.ShouldBindJSON(&updateReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	res, err := service.PatchProposals(updateReq)
	if err != nil {
		returnError(200, err.Error(), err, c)
		return
	}
	returnData(200, 0, res, c)
}

func (h Handler) PostProposals(c *gin.Context) {
	var req models.CreateProposalRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	res, err := service.CreateProposals(req)
	if err != nil {
		returnError(200, err.Error(), err, c)
		return
	}
	returnData(200, 0, res, c)
}

func (h Handler) GetProposals(c *gin.Context, params api.GetProposalsParams) {
	res, count, err := service.ListProposals(params.Page, params.PageSize)
	if err != nil {
		returnError(200, err.Error(), err, c)
		return
	}
	returnData(200, count, res, c)

}

func (h Handler) PostRecord(c *gin.Context) {
	var record models.Record

	if err := c.ShouldBindJSON(&record); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	res, err := service.CreateRecord(record)
	if err != nil {
		returnError(200, err.Error(), err, c)
		return
	}
	returnData(200, 0, res, c)
}

func (h Handler) GetRecordProposalId(c *gin.Context, proposalId int, params api.GetRecordProposalIdParams) {

	err := service.AuthRecord(proposalId, params.Participant)
	if err != nil {
		returnError(200, err.Error(), err, c)
		return
	}

	res, err := service.GetRecord(proposalId)
	if err != nil {
		returnError(200, err.Error(), err, c)
		return
	}
	returnData(200, 0, res, c)

}

func (h Handler) PostInvolve(c *gin.Context) {
	var req models.CreateInvolveRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	res, err := service.CreateInvolve(req)
	if err != nil {
		returnError(200, err.Error(), err, c)
		return
	}
	returnData(200, 0, res, c)
}

func (h Handler) GetInvolveProposalId(c *gin.Context, proposalId int) {
	res, err := service.GetInvolve(proposalId)
	if err != nil {
		returnError(200, err.Error(), err, c)
		return
	}
	returnData(200, 0, res, c)

}
