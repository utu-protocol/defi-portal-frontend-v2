# build output folder
OUTPUTFOLDER = build
# docker image
S3_BUCKET = s3://defi-portal-frontend
CF_DISTRIBUTION_ID = E760LVUFPER2T

S3_STAGE_BUCKET = s3://stage-defi-portal-frontend
CF_STAGE_DISTRIBUTION_ID = E911R8INHJBM3
AWS_PROFILE = utu.live

.PHONY: list
list:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs

clean:
	@echo remove $(OUTPUTFOLDER) folder
	@rm -rf $(OUTPUTFOLDER)
	@echo done

install:
	@echo install dependecies
	npm install

build: clean install build-dist

build-dist:
	@echo build release
	npm run build -- --prod
	@echo done

deploy-stage:
	@echo deploy S3
	aws --profile $(AWS_PROFILE) s3 sync --acl public-read ./$(OUTPUTFOLDER) $(S3_STAGE_BUCKET)
	aws --profile $(AWS_PROFILE) cloudfront create-invalidation --distribution-id $(CF_STAGE_DISTRIBUTION_ID) --paths '/*'
	@echo "deploy S3 Staging done (wait a minute for the cache to be invalidated)"

deploy:
	@echo deploy S3
	aws --profile $(AWS_PROFILE) s3 sync --acl public-read ./$(OUTPUTFOLDER) $(S3_BUCKET)
	aws --profile $(AWS_PROFILE) cloudfront create-invalidation --distribution-id $(CF_DISTRIBUTION_ID) --paths '/*'
	@echo "deploy S3 done (wait a minute for the cache to be invalidated)"

