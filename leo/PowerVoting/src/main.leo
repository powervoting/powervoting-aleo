// The 'PowerVoting' program.
program PowerVoting.aleo {
// The 'PowerVoting' program.

    struct Proposal {
        // title 由前端转换为 field
        title:  field,
        // id 由前端将 title hash 为 id
        proposal_id: u64,
        // 提案发起人
        promoter: address,
        // 提案声明
        description: field,
        // 提案开始时间
        start_time: u64,
        // 提案结束时间
        end_time: u64,
        // ...
        // 投票选项
        opt: Options,
    }

    struct Options {
        opt1:  field,
        opt2:  field,
        opt3:  field,
        opt4:  field,
        opt5:  field,
        opt6:  field,
        opt7:  field,
        opt8:  field,
        opt9:  field,
        opt10: field,
    }

    struct Voters {
        vote1: field,
        vote2: field,
        vote3: field,
        vote4: field,
        vote5: field,
        vote6: field,
        vote7: field,
        vote8: field,
        vote9: field,
        vote10: field,
        vote11: field,
        vote12: field,
        vote13: field,
        vote14: field,
        vote15: field,
        vote16: field,
        vote17: field,
        vote18: field,
        vote19: field,
        vote20: field,
    }
    
    record Power_Voting_NFT {
        owner: address,
        gates: u64,
        proposal_id: u64,
    }

    record Vote_Result {
        owner: address,
        gates: u64,
        proposal_id: u64,
        choose: field,
    }

    record Win {
        owner: address, 
        gates: u64,
        proposal_id: u64,
        winner: field,
        count: u8,
    }

    struct Win_Struct {
        winner: field,
        count: u8,
    }
    
    // 提案记录(public)
    mapping proposals: u64 => Proposal;

    // 领取NFT记录
    mapping received: address => bool;

    // 投票记录
    mapping voted: address => bool;

    // 计票结果
    mapping result: u64 => Win_Struct;

    // 创建项目
    transition NewProposal(
        public title:  field,
        public id: u64,
        public promoter: address,
        public description: field,
        public start_time: u64,
        public end_time: u64,
        public opt: Options,
        ) -> (public Proposal) {
        let new: Proposal = Proposal {
        title:  title,
        proposal_id: id,
        promoter: promoter,
        description: description,
        start_time: start_time,
        end_time: end_time,
        opt: opt,
        };
        
        return new then finalize(id, new);
    }
    finalize NewProposal(proposal_id: u64, new: Proposal) {
            Mapping::set(proposals, proposal_id, new);
    }


    // 领取NFT
    transition mint_power_voting_nft(owner: address, proposal_id: u64) -> Power_Voting_NFT {
            let nft: Power_Voting_NFT = Power_Voting_NFT {
                owner: owner,
                gates: 0u64,
                proposal_id: proposal_id,
            };

            return nft then finalize(owner);
    }
    finalize mint_power_voting_nft(owner: address) {
        Mapping::set(received, owner, true);
    }



    // 投票
    transition poll(nft: Power_Voting_NFT, proposal_id: u64, choose: field, controller_address: address) -> (Vote_Result, Vote_Result) {
        assert_eq(nft.proposal_id, proposal_id);

        let vote_owner: Vote_Result = Vote_Result {
            owner: nft.owner,
            gates: 0u64,
            proposal_id: nft.proposal_id,
            choose: choose,
        };
        
        let controller_owner: Vote_Result = Vote_Result {
            owner: controller_address,
            gates: 0u64,
            proposal_id: nft.proposal_id,
            choose: choose,
        };

        return (vote_owner, controller_owner) then finalize(nft.owner);
    }
    finalize poll(owner: address) {
        Mapping::set(voted, owner, true);
    }

    // 计票
    transition vote_count(
        opt: Options,
        max: u8,
        list: Voters,
        controller: address,
        proposal_id: u64,
    ) -> Win {

        assert_eq(self.caller, controller);
        let opt1_count: u8 = 0u8;
        let opt2_count: u8 = 0u8;
        let opt3_count: u8 = 0u8;
        let opt4_count: u8 = 0u8;
        let opt5_count: u8 = 0u8;
        let opt6_count: u8 = 0u8;
        let opt7_count: u8 = 0u8;
        let opt8_count: u8 = 0u8;
        let opt9_count: u8 = 0u8;
        let opt10_count: u8 = 0u8;
        let range: u8 = 0u8;

        opt1_count = check_choose(opt.opt1,list);
        range = range.add(1u8);
        if range >= max {
            let win: Win_Struct = check_winer(
                max,
                opt, 
                opt1_count, 
                opt2_count, 
                opt3_count, 
                opt4_count, 
                opt5_count, 
                opt6_count, 
                opt7_count, 
                opt8_count, 
                opt9_count, 
                opt10_count,
                );
            return Win {
                owner: controller,
                gates: 0u64,
                proposal_id: proposal_id,
                winner: win.winner,
                count: win.count,
            } then finalize(proposal_id, win);    
        }

        opt2_count = check_choose(opt.opt2,list); 
        range = range.add(1u8);
        if range >= max {
            let win: Win_Struct = check_winer(
                max,
                opt, 
                opt1_count, 
                opt2_count, 
                opt3_count, 
                opt4_count, 
                opt5_count, 
                opt6_count, 
                opt7_count, 
                opt8_count, 
                opt9_count, 
                opt10_count,
                );
            return Win {
                owner: controller,
                gates: 0u64,
                proposal_id: proposal_id,
                winner: win.winner,
                count: win.count,
            };     
        }

        opt3_count = check_choose(opt.opt3,list); 
        range = range.add(1u8);
        if range >= max {
            let win: Win_Struct = check_winer(
                max,
                opt, 
                opt1_count, 
                opt2_count, 
                opt3_count, 
                opt4_count, 
                opt5_count, 
                opt6_count, 
                opt7_count, 
                opt8_count, 
                opt9_count, 
                opt10_count,
                );
            return Win {
                owner: controller,
                gates: 0u64,
                proposal_id: proposal_id,
                winner: win.winner,
                count: win.count,
            }; 
        }

        opt4_count = check_choose(opt.opt4,list); 
        range = range.add(1u8);
        if range >= max {
            let win: Win_Struct = check_winer(
                max,
                opt, 
                opt1_count, 
                opt2_count, 
                opt3_count, 
                opt4_count, 
                opt5_count, 
                opt6_count, 
                opt7_count, 
                opt8_count, 
                opt9_count, 
                opt10_count,
                );
            return Win {
                owner: controller,
                gates: 0u64,
                proposal_id: proposal_id,
                winner: win.winner,
                count: win.count,
            }; 
        }

        opt5_count = check_choose(opt.opt5,list); 
        range = range.add(1u8);
        if range >= max {
            let win: Win_Struct = check_winer(
                max,
                opt, 
                opt1_count, 
                opt2_count, 
                opt3_count, 
                opt4_count, 
                opt5_count, 
                opt6_count, 
                opt7_count, 
                opt8_count, 
                opt9_count, 
                opt10_count,
                );
            return Win {
                owner: controller,
                gates: 0u64,
                proposal_id: proposal_id,
                winner: win.winner,
                count: win.count,
            }; 
        }

        opt6_count = check_choose(opt.opt6,list); 
        range = range.add(1u8);
        if range >= max {
            let win: Win_Struct = check_winer(
                max,
                opt, 
                opt1_count, 
                opt2_count, 
                opt3_count, 
                opt4_count, 
                opt5_count, 
                opt6_count, 
                opt7_count, 
                opt8_count, 
                opt9_count, 
                opt10_count,
                );
            return Win {
                owner: controller,
                gates: 0u64,
                proposal_id: proposal_id,
                winner: win.winner,
                count: win.count,
            }; 
        }

        opt7_count = check_choose(opt.opt7,list); 
        range = range.add(1u8);
        if range >= max {
            let win: Win_Struct = check_winer(
                max,
                opt, 
                opt1_count, 
                opt2_count, 
                opt3_count, 
                opt4_count, 
                opt5_count, 
                opt6_count, 
                opt7_count, 
                opt8_count, 
                opt9_count, 
                opt10_count,
                );
            return Win {
                owner: controller,
                gates: 0u64,
                proposal_id: proposal_id,
                winner: win.winner,
                count: win.count,
            }; 
        }

        opt8_count = check_choose(opt.opt8,list); 
        range = range.add(1u8);
        if range >= max {
            let win: Win_Struct = check_winer(
                max,
                opt, 
                opt1_count, 
                opt2_count, 
                opt3_count, 
                opt4_count, 
                opt5_count, 
                opt6_count, 
                opt7_count, 
                opt8_count, 
                opt9_count, 
                opt10_count,
                ); 
            return Win {
                owner: controller,
                gates: 0u64,
                proposal_id: proposal_id,
                winner: win.winner,
                count: win.count,
            }; 
        }

        opt9_count = check_choose(opt.opt9,list); 
        range = range.add(1u8);
        if range >= max {
            let win: Win_Struct = check_winer(
                max,
                opt, 
                opt1_count, 
                opt2_count, 
                opt3_count, 
                opt4_count, 
                opt5_count, 
                opt6_count, 
                opt7_count, 
                opt8_count, 
                opt9_count, 
                opt10_count,
                ); 
            return Win {
                owner: controller,
                gates: 0u64,
                proposal_id: proposal_id,
                winner: win.winner,
                count: win.count,
            };
        }

        opt10_count = check_choose(opt.opt10,list); 
        range = range.add(1u8);
        if range >= max {
            let win: Win_Struct = check_winer(
                max,
                opt, 
                opt1_count, 
                opt2_count, 
                opt3_count, 
                opt4_count, 
                opt5_count, 
                opt6_count, 
                opt7_count, 
                opt8_count, 
                opt9_count, 
                opt10_count,
                ); 
            return Win {
                owner: controller,
                gates: 0u64,
                proposal_id: proposal_id,
                winner: win.winner,
                count: win.count,
            };
        }
       
        assert(true);
        let failed1: Win =  Win {
            owner: controller,
            gates: 0u64,
            proposal_id: proposal_id,
            winner: 0field,
            count: 0u8,
        };
        let failed2: Win_Struct = Win_Struct {
            winner: 0field,
            count: 0u8,
        };
        return failed1 then finalize(proposal_id, failed2);
    }
    finalize vote_count(proposal_id: u64, win: Win_Struct) {
        Mapping::set(result, proposal_id, win);
    }

    function check_choose(opt: field, list: Voters) -> u8 {
        let opt_count: u8 = 0u8; 
        if opt == list.vote1 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote2 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote3 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote4 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote5 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote6 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote7 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote8 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote9 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote10 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote11 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote12 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote13 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote14 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote15 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote16 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote17 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote18 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote19 {
            opt_count = opt_count.add(1u8);
        }
        if opt == list.vote20 {
            opt_count = opt_count.add(1u8);
        }
        return opt_count;
    }

    function check_winer(
        max: u8,
        opt: Options,
        opt1_count: u8, 
        opt2_count: u8, 
        opt3_count: u8, 
        opt4_count: u8, 
        opt5_count: u8, 
        opt6_count: u8, 
        opt7_count: u8, 
        opt8_count: u8, 
        opt9_count: u8, 
        opt10_count: u8,
    ) -> Win_Struct {
        let temp_opt: field = opt.opt1;
        let temp_opt_count: u8 = opt1_count;
        let range: u8 = 0u8;

        if range < max && temp_opt_count < opt2_count {
            temp_opt = opt.opt2;
            temp_opt_count = opt2_count;
        }
        range = range.add(1u8);

        if range < max && temp_opt_count < opt3_count {
            temp_opt = opt.opt3;
            temp_opt_count = opt3_count;
        }
        range = range.add(1u8);

        if range < max && temp_opt_count < opt4_count {
            temp_opt = opt.opt4;
            temp_opt_count = opt4_count;
        }
        range = range.add(1u8);

        if range < max && temp_opt_count < opt5_count {
            temp_opt = opt.opt5;
            temp_opt_count = opt5_count;
        }
        range = range.add(1u8);

        if range < max && temp_opt_count < opt6_count {
            temp_opt = opt.opt6;
            temp_opt_count = opt6_count;
        }
        range = range.add(1u8);

        if range < max && temp_opt_count < opt7_count {
            temp_opt = opt.opt7;
            temp_opt_count = opt7_count;
        }
        range = range.add(1u8);

        if range < max && temp_opt_count < opt8_count {
            temp_opt = opt.opt8;
            temp_opt_count = opt8_count;
        }
        range = range.add(1u8);

        if range < max && temp_opt_count < opt9_count {
            temp_opt = opt.opt9;
            temp_opt_count = opt9_count;
        }
        range = range.add(1u8);

        if range < max && temp_opt_count < opt10_count {
            temp_opt = opt.opt10;
            temp_opt_count = opt10_count;
        }
        range = range.add(1u8);

        return Win_Struct {
            winner: temp_opt,
            count: temp_opt_count,
        };
    }

}

