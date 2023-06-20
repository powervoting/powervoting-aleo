#!/bin/bash

echo "
###############################################################################
########                                                               ########
########                 STEP 1: Propose a new ballot                  ########
########                                                               ########
########                  ---------------------------                  ########
########                  |         |  Yes  |   No  |                  ########
########                  ---------------------------                  ########
########                  |  Votes  |       |       |                  ########
########                  ---------------------------                  ########
########                                                               ########
###############################################################################
"
leo run NewProposal 8830327835544761107633518695472field  1234895761u64 235098612field 1234u64 12345u64 "{opt1:3049280field,opt2:42496field,opt3:0field,opt4:0field,opt5:0field,opt6:0field,opt7:0field,opt8:0field,opt9:0field,opt10:0field}"
/*
       Leo Compiled 'main.leo' into Aleo instructions
       Leo ✅ Built 'PowerVoting.aleo' (in "/home/huangxinzhong/PowerVoting/build")


⛓  Constraints

 •  'PowerVoting.aleo/NewProposal' - 0 constraints (called 1 time)

➡️  Output

 • {
  title: 8830327835544761107633518695472field,
  proposal_id: 12121u64,
  promoter: aleo1l44dfmwcu7j2e26yhrlhrxla4lsrmr0rxymxfzxj6h8m2mnegyqs8x0end,
  description: 235098612field,
  start_time: 1234u64,
  end_time: 12345u64,
  opt: {
    opt1: 3049280field,
    opt2: 42496field,
    opt3: 0field,
    opt4: 0field,
    opt5: 0field,
    opt6: 0field,
    opt7: 0field,
    opt8: 0field,
    opt9: 0field,
    opt10: 0field
  }
}

       Leo ✅ Executed 'PowerVoting.aleo/NewProposal' (in "/home/huangxinzhong/PowerVoting/build")
*/


leo run mint_power_voting_nft aleo12hpwhgp3xjsv9xfdrmuxtyurfspv6veha4j26svfprnevcfz8yps7gnjh4 12121u64

/*
       Leo Compiled 'main.leo' into Aleo instructions
       Leo ✅ Built 'PowerVoting.aleo' (in "/home/huangxinzhong/PowerVoting/build")


⛓  Constraints

 •  'PowerVoting.aleo/mint_power_voting_nft' - 2,020 constraints (called 1 time)

➡️  Output

 • {
  owner: aleo12hpwhgp3xjsv9xfdrmuxtyurfspv6veha4j26svfprnevcfz8yps7gnjh4.private,
  gates: 0u64.private,
  proposal_id: 12121u64.private,
  _nonce: 2240179462350056033419480608392187804109915718793374420363465185515412489805group.public
}

       Leo ✅ Executed 'PowerVoting.aleo/mint_power_voting_nft' (in "/home/huangxinzhong/PowerVoting/build")
*/


leo run mint_power_voting_nft aleo1cqg8mnj97zqjyldjkcm2meu0d35mkavuzx4hw93hmkgpe6qsrcpq07e460 12121u64
       Leo Compiled 'main.leo' into Aleo instructions
       Leo ✅ Built 'PowerVoting.aleo' (in "/home/huangxinzhong/PowerVoting/build")


⛓  Constraints

 •  'PowerVoting.aleo/mint_power_voting_nft' - 2,020 constraints (called 1 time)

➡️  Output

 • {
  owner: aleo1cqg8mnj97zqjyldjkcm2meu0d35mkavuzx4hw93hmkgpe6qsrcpq07e460.private,
  gates: 0u64.private,
  proposal_id: 12121u64.private,
  _nonce: 1051806227611006117908727908391938791096299518249709582024637455412915309369group.public
}

       Leo ✅ Executed 'PowerVoting.aleo/mint_power_voting_nft' (in "/home/huangxinzhong/PowerVoting/build")


leo run poll "{
  owner: aleo12hpwhgp3xjsv9xfdrmuxtyurfspv6veha4j26svfprnevcfz8yps7gnjh4.private,
  gates: 0u64.private,
  proposal_id: 12121u64.private,
  _nonce: 2240179462350056033419480608392187804109915718793374420363465185515412489805group.public
}" 12121u64 3049280field aleo1l44dfmwcu7j2e26yhrlhrxla4lsrmr0rxymxfzxj6h8m2mnegyqs8x0end
/*       Leo Compiled 'main.leo' into Aleo instructions
       Leo ✅ Built 'PowerVoting.aleo' (in "/home/huangxinzhong/PowerVoting/build")


⛓  Constraints

 •  'PowerVoting.aleo/poll' - 4,044 constraints (called 1 time)

➡️  Outputs

 • {
  owner: aleo12hpwhgp3xjsv9xfdrmuxtyurfspv6veha4j26svfprnevcfz8yps7gnjh4.private,
  gates: 0u64.private,
  proposal_id: 12121u64.private,
  choose: 3049280field.private,
  _nonce: 8025417821283397545737025920274287935579827691755892660156509103573232735548group.public
}
 • {
  owner: aleo1l44dfmwcu7j2e26yhrlhrxla4lsrmr0rxymxfzxj6h8m2mnegyqs8x0end.private,
  gates: 0u64.private,
  proposal_id: 12121u64.private,
  choose: 3049280field.private,
  _nonce: 3421379108098427821003000255873623131190795694693681723300970221405880437009group.public
}

       Leo ✅ Executed 'PowerVoting.aleo/poll' (in "/home/huangxinzhong/PowerVoting/build")
*/

leo run poll "{
>   owner: aleo1cqg8mnj97zqjyldjkcm2meu0d35mkavuzx4hw93hmkgpe6qsrcpq07e460.private,
>   gates: 0u64.private,
>   proposal_id: 12121u64.private,
>   _nonce: 1051806227611006117908727908391938791096299518249709582024637455412915309369group.public
> }" 12121u64 3049280field aleo1l44dfmwcu7j2e26yhrlhrxla4lsrmr0rxymxfzxj6h8m2mnegyqs8x0end
/*       Leo Compiled 'main.leo' into Aleo instructions
       Leo ✅ Built 'PowerVoting.aleo' (in "/home/huangxinzhong/PowerVoting/build")


⛓  Constraints

 •  'PowerVoting.aleo/poll' - 4,044 constraints (called 1 time)

➡️  Outputs

 • {
  owner: aleo1cqg8mnj97zqjyldjkcm2meu0d35mkavuzx4hw93hmkgpe6qsrcpq07e460.private,
  gates: 0u64.private,
  proposal_id: 12121u64.private,
  choose: 3049280field.private,
  _nonce: 4338977282764343582050798096684284573265734941286999653695319731914451384927group.public
}
 • {
  owner: aleo1l44dfmwcu7j2e26yhrlhrxla4lsrmr0rxymxfzxj6h8m2mnegyqs8x0end.private,
  gates: 0u64.private,
  proposal_id: 12121u64.private,
  choose: 3049280field.private,
  _nonce: 5846272539226382787831842225607835041186512744568198197021512827487983553071group.public
}

       Leo ✅ Executed 'PowerVoting.aleo/poll' (in "/home/huangxinzhong/PowerVoting/build")
*/

leo run vote_count "{opt1:3049280field,opt2:42496field,opt3:0field,opt4:0field,opt5:0field,opt6:0field,opt7:0field,opt8:0field,opt9:0field,opt10:0field}" 2u8 "{vote1:3049280field,vote2:3049280field,vote3:0field,vote4:0field,vote5:0field,vote6:0field,vote7:0field,vote8:0field,vote9:0field,vote10:0field,vote11:0field,vote12:0field,vote13:0field,vote14:0field,vote15:0field,vote16:0field,vote17:0field,vote18:0field,vote19:0field,vote20:0field}" aleo1l44dfmwcu7j2e26yhrlhrxla4lsrmr0rxymxfzxj6h8m2mnegyqs8x0end 12121u64
       Leo Compiled 'main.leo' into Aleo instructions
       Leo ✅ Built 'PowerVoting.aleo' (in "/home/huangxinzhong/PowerVoting/build")


⛓  Constraints

 •  'PowerVoting.aleo/vote_count' - 50,261 constraints (called 1 time)

➡️  Output

 • {
  owner: aleo1l44dfmwcu7j2e26yhrlhrxla4lsrmr0rxymxfzxj6h8m2mnegyqs8x0end.private,
  gates: 0u64.private,
  proposal_id: 12121u64.private,
  winner: 3049280field.private,
  count: 2u8.private,
  _nonce: 6463640253509714693894081736422108975592205341762640492612929311339297834953group.public
}

       Leo ✅ Executed 'PowerVoting.aleo/vote_count' (in "/home/huangxinzhong/PowerVoting/build")
    