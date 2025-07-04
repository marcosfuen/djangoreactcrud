# FROM nginx:latest

# ENV HOME=/usr/src/app
# ENV APP_HOME=/usr/src/app

# RUN mkdir $APP_HOME
# RUN mkdir $APP_HOME/static
# RUN mkdir $APP_HOME/media

# WORKDIR $APP_HOME

# RUN rm /etc/nginx/conf.d/default.conf

# COPY ./nginx/nginx.conf /etc/nginx/conf.d
# COPY --from=build /usr/src/app/frontend/dist /usr/share/nginx/html

FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

WORKDIR /usr/src/app