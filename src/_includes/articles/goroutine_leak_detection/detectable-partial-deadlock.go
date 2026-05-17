package main

import (
	"fmt"
	"net/http"
	_ "net/http/pprof"
	"runtime"
)

type (
	Receiver struct {
		errCh  chan error
		dataCh chan any
	}

	Producer struct {
		errCh  chan error
		dataCh chan any
	}
)

func NewReceiver(errCh chan error, dataCh chan any) *Receiver {
	return &Receiver{
		errCh:  errCh,
		dataCh: dataCh,
	}
}

func NewProducer(errCh chan error, dataCh chan any) *Producer {
	return &Producer{
		errCh:  errCh,
		dataCh: dataCh,
	}
}

func (r *Receiver) Run() {
	go func() {
		for err := range r.errCh {
			fmt.Printf("[REC] - err: %s\n", err.Error())
		}
	}()

	go func() {
		for data := range r.dataCh {
			fmt.Printf("[REC] - data: %v\n", data)
		}
	}()
}

func (p *Producer) Run() {
	var num int

	for {
		fmt.Println("[PROD] - Enter a number: ")

		_, err := fmt.Scanf("%d", &num)
		if err != nil {
			p.errCh <- err

			return
		}

		p.dataCh <- num
	}
}

func main() {
	go func() {
		dataCh := make(chan any)
		errCh := make(chan error)

		r := NewReceiver(errCh, dataCh)
		r.Run()

		p := NewProducer(errCh, dataCh)
		p.Run()
	}()

	fmt.Println("Listening on port :6060")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "I am alive\n")

		// Run garbage collection to detect partial deadlocks
		runtime.GC()
	})

	err := http.ListenAndServe(":6060", nil)
	if err != nil {
		fmt.Printf("http server error: %s\n", err.Error())
	}
}
