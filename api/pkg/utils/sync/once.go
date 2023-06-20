package sync

import (
	"sync/atomic"
)

type RecoverableOnce struct {
	ok atomic.Bool
}

func (o *RecoverableOnce) Do(function func()) {
	if !o.ok.Load() {
		defer func() {
			err := recover()
			if err != nil {
				o.ok.Store(false)
			}
		}()
		function()
		o.ok.Store(true)
	}
}
