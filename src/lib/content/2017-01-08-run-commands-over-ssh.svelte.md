---
layout: post
title: 'Run commands over SSH!'
date: 2017-01-08 08:19:15 -0600
comments: true
categories: admin ssh devops
---

Sometimes I need to run a few command on a remote machine. Before, I would have SSH'd into
the remote machine and started making changes. But, since this isn't repeatable, it's not ideal.
I have an alternative. You can setup a script, on your local system, and then run the
script over SSH!

Please be aware: There are better ways. Such as Ansible, Terraform, Cloudfront, etc. But
those are heavier tools than a shell script.

In the example below, I wanted to keep the script, and some configuration files, in version control
but I also wanted a quick and easy way to deploy the changes.

The first half of the script copies files, using `scp`, from a local machine to
the remote server.

The second half of the script (starting on line 12) runs commands from the
remote machine. The files are moved to the correct locations and Nginx and
Haproxy are restarted.

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
