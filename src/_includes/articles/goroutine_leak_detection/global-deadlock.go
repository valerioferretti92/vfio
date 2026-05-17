package main

import "sync"

func main() {
	var wg sync.WaitGroup
	dataReady := make(chan bool)

	wg.Add(1)
	go func() {
		if <-dataReady {
			wg.Done()
		}
	}()

	wg.Wait()
	dataReady <- true
}
