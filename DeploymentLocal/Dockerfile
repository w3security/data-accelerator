FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build-env

WORKDIR /app/aspnetcore

FROM mcr.microsoft.com/dotnet/aspnet:3.1

WORKDIR /app/aspnetcore

COPY "finalrun.sh" "devices.csv" "./" 

ENV NODE_VERSION="14.3.0"  NODE_DOWNLOAD_SHA="ea08acdf403d13ab67303d503eab080a5285c005c75c0710551d928f3cc74057" \
    DATAX_ENABLE_ONEBOX="true"  DATAX_ONEBOX_ROOT="./datax"  NPM_CONFIG_LOGLEVEL="info" \
    SPARK_VERSION="2.3.0" ASPNETCORE_URLS="http://+:5000" port="2020" \
    DATAXDEV_FLOW_MANAGEMENT_LOCAL_SERVICE="http://localhost:5000"  NODE_ENV="production" 

ENV JAVA_HOME="/usr/lib/jvm/zulu-8-amd64" \
	SPARK_PACKAGE="spark-${SPARK_VERSION}-bin-hadoop2.6" \
	SPARK_HOME="/usr/spark-${SPARK_VERSION}"

ENV PATH="$PATH:$JAVA_HOME/bin:${SPARK_HOME}/bin:/app/aspnetcore"

# Install node
RUN curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" --output "nodejs.tar.gz" \
    && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
    && tar -xvzf "nodejs.tar.gz" -C "/usr/local" --strip-components=1 \
    && rm -v "nodejs.tar.gz" \
    && ( cd "/usr/local/bin" ; ln -s "node" "nodejs" )

# Install jdk 8
# mkdir required because of https://github.com/resin-io-library/base-images/issues/273
RUN apt-get update && apt-get install -y gnupg2 \
    && mkdir -p /usr/share/man/man1 \
    && apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 0xB1998361219BD9C9 && \
    echo "deb http://repos.azulsystems.com/ubuntu stable main" >> /etc/apt/sources.list.d/zulu.list && \
    apt-get -qq update && \
    apt-get -qqy install zulu-8 && \
    rm -rf /var/lib/apt/lists/*

# Install spark
RUN curl -sL --retry 3 \
    "https://archive.apache.org/dist/spark/spark-${SPARK_VERSION}/${SPARK_PACKAGE}.tgz" \
    | tar vxz -C /usr/ \
    && mv /usr/$SPARK_PACKAGE $SPARK_HOME \
    && chown -R root:root "$SPARK_HOME"
	
# Debian security updates
RUN apt-get update || true && apt-get -y install apt-transport-https
RUN echo "deb http://security.debian.org/debian-security buster/updates main contrib non-free" >> /etc/apt/sources.list
RUN apt-get update && apt-get upgrade -y

ADD "FlowManagement.tar" "deployment.tar"  "./"
ADD   "datax.tar"  "./datax/bin"
COPY "sample/*.json"  "./samples/" 
RUN npm install

EXPOSE 2020

# Adding the execute permission. 
RUN chmod +x ./finalrun.sh
ENTRYPOINT ["finalrun.sh"]
