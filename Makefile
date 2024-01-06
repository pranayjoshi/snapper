.PHONY: all client server run
all: client server
client:
	cd client && npm start
server:
	cd server && nodemon index.ts.
run:
	tmux new-session -d -s client 'cd client && npm start'
	tmux new-session -d -s server 'cd server && nodemon index.ts'
clean:
	cd client && rm -rf node_modules && rm -rf bclientld
	cd server && rm main
docker-client:
	docker bclientld -t my-client ./client
docker-server:
	docker bclientld -t my-server ./server
run-docker:
	docker run -d -p 3000:3000 my-client
	docker run -d -p 8080:8080 my-server
kill:
	tmux has-session -t client 2>/dev/null && tmux kill-session -t client || true
	tmux has-session -t server 2>/dev/null && tmux kill-session -t server || true