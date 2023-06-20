package models

type Record struct {
	Id         uint   `gorm:"primarykey" json:"id"`
	ProposalId int    `json:"proposal_id"`
	Win        string `json:"win"`
}
