package models

type Involve struct {
	Id         uint   `gorm:"primarykey" json:"id"`
	ProposalId int    `json:"proposal_id"`
	Vote       string `json:"vote"`
}

type Vote struct {
	Id          uint   `gorm:"primarykey" json:"id"`
	ProposalId  int    `json:"proposal_id"`
	Participant string `json:"participant"`
}

type CreateInvolveRequest struct {
	ProposalId  int    `json:"proposal_id"`
	Participant string `json:"participant"`
	Vote        string `json:"vote"`
}
