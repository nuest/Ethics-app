build_image:
	cd ..; \
	docker build \
	--build-arg VCS_REF=`git rev-parse --short HEAD` \
	--build-arg VCS_URL=`git config --get remote.origin.url` \
	--build-arg BUILD_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"` \
	-t ethics-app .

run_dev:
	docker run -it -e NODE_ENV=development ethics-app

run_compose:
	docker-compose up

run_shell:
	docker run -it --rm -e NODE_ENV=development ethics-app /bin/sh

.PHONY: build_image run run_dev run_compose run_shell