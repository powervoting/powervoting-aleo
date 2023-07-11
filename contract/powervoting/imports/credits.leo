program credits.aleo {

    mapping account: address => u64;

    record credits {
        owner: address,
        microcredits: u64,
    }

    transition mint (public r0: address, public r1: u64) -> credits {
        assert_eq(r0, self.caller);
        let r2: bool = r1 < 100000000000000u64;
        assert_eq(r2, true);
        return credits {
            owner: r0,
            microcredits: r1
        };
    }

    transition transfer_public (public r0: address, public r1: u64) {
        return then finalize(self.caller, r0, r1);
    }

    finalize transfer_public (r0: address, r1: address, r2: u64) {
        let r3: u64 = Mapping::get_or_use(account, r0, 0u64);
        let r4: u64 = r3 - r2;
        Mapping::set(account, r0, r4);
        let r5: u64 = Mapping::get_or_use(account, r1, 0u64);
        let r6: u64 = r5 + r2;
        Mapping::set(account, r1, r6);
    }


    transition transfer_private (r0: credits, private r1: address, private r2: u64) -> (credits, credits) {
        let r3: u64 = r0.microcredits - r2;
        let r4: credits = credits{
            owner: r1,
            microcredits: r2
        };
        let r5: credits = credits{
            owner: r0.owner,
            microcredits: r3
        };
        return (r4,r5);
    }


    transition transfer_private_to_public (r0: credits, public r1: address, public r2: u64) -> credits {
        let r3: u64 = r0.microcredits - r2;
        let r4: credits = credits{
            owner: r0.owner,
            microcredits: r3
        };
        return r4 then finalize(r1,r2);
    }

    finalize transfer_private_to_public (r0: address, r1: u64) {
        let r2: u64 = Mapping::get_or_use(account, r0, 0u64);
        Mapping::set(account, r0, r1 + r2);
    }

    transition transfer_public_to_private (public r0: address, public r1: u64) -> credits {
        let r2: credits = credits{
            owner: r0,
            microcredits: r1
        };
        return r2 then finalize(self.caller, r1);
    }

    finalize transfer_public_to_private (r0: address, r1: u64) {
        let r2: u64 = Mapping::get_or_use(account, r0, 0u64);
        Mapping::set(account, r0, r2 -r1);
    }


    transition join (r0: credits, r1: credits) -> credits {
        let r2: u64 = r0.microcredits + r1.microcredits;
        let r3: credits = credits{
            owner: r0.owner,
            microcredits: r2
        };
        return r3;
    }


    transition split (r0: credits, private r1: u64) -> (credits, credits) {
        let r2: u64 = r0.microcredits - r1;
        let r3: credits = credits{
            owner: r0.owner,
            microcredits: r1
        };
        let r4: credits = credits{
            owner: r0.owner,
            microcredits: r2
        };
        return (r3, r4);
    }
    

    transition fee (r0: credits, public r1: u64, public r2: field) -> credits {
        assert_neq(r1, 0u64);
        let r3: u64 = r0.microcredits - r1;
        let r4: credits = credits{
            owner: r0.owner,
            microcredits: r3
        };
        return r4;
    }

}