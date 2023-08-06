---
layout: post
title: 'Run commands over SSH!'
date: 2017-01-08 08:19:15 -0600
comments: true
categories: admin ssh devops
---

Sometimes I'll need to run a few command on a remote machine. In the past, I would SSH into
the machine and I would started making changes. But this is not ideal since this isn't repeatable.
If you've run into this problem, I have an alternative! You can execute a shell script from your
local system and have it run commands on the remote system using SSH!

**Please be aware** that there are better tools -- Ansible, Terraform, CloudFormation, etc. But
those are heavy tools.

In this example, I have some configuration files that need to be copied to the remote system, and
then I need to execute a couple commands. I also wanted the script to be checked into version
control.

The first half of the script copies files, using `scp`, from my local machine to
the remote machine. The second half of the script (starting on line 12) runs commands from the
remote machine. The files are moved to the correct locations and Nginx and Haproxy are restarted.


```bash
#!/bin/bash

PEM=id_rsa.pub
HOST=ec2-54-234-130-49.compute-1.amazonaws.com

scp -i ~/.ssh/$PEM ./surrogate_pop.conf ubuntu@$HOST:/tmp
scp -i ~/.ssh/$PEM ./haproxy.cfg ubuntu@$HOST:/tmp
scp -i ~/.ssh/$PEM ./traffic_cop.lua ubuntu@$HOST:/tmp
scp -i ~/.ssh/$PEM ./allowed_domains.lua ubuntu@$HOST:/tmp

## These are executed on the remote host
ssh -i ~/.ssh/$PEM ubuntu@$HOST 'bash -s' <<EOF
sudo mv /tmp/traffic_cop.lua /usr/share/nginx/traffic_cop.lua
sudo mv /tmp/allowed_domains.lua /usr/share/nginx/allowed_domains.lua
sudo mv /tmp/surrogate_pop.conf /etc/nginx/sites-enabled/surrogate_pop.conf
sudo service nginx restart

sudo mv /tmp/haproxy.cfg /etc/haproxy/haproxy.cfg
sudo service haproxy restart
EOF
```
