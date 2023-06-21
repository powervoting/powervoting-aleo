package models

type Recevied struct {
	Id         uint   `gorm:"primarykey" json:"id"`
	ProposalId int    `json:"proposal_id"`
	Receiver   string `json:"receiver"` // 领取人
}
