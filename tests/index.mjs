#!/usr/bin/env zx

import { git, jdk, maven, python } from '../src/index.mjs'

const mvn = await maven.info()

console.log(await git.info())
console.log(await jdk.info())
console.log(mvn)
console.log(await python.info())

$.verbose = true
// mvn clean package -f /Users/zhangxin/Documents/work_space/demo/pom.xml -DskipTests=true -Dmaven.compiler.fork=true -Dmaven.compiler.executable=/Library/Java/JavaVirtualMachines/jdk1.8.0_333.jdk/Contents/Home/bin/javac
await $`${mvn.path} clean package -f /Users/zhangxin/Documents/work_space/demo/pom.xml -DskipTests=true -Dmaven.compiler.fork=true -Dmaven.compiler.executable=/Library/Java/JavaVirtualMachines/jdk1.8.0_333.jdk/Contents/Home/bin/javac`

console.log('------------------------')

$.verbose = false
const { stdout } = await $`${mvn.path} clean package -f /Users/zhangxin/Documents/work_space/demo/pom.xml -DskipTests=true -Dmaven.compiler.fork=true -Dmaven.compiler.executable=/Library/Java/JavaVirtualMachines/jdk1.8.0_333.jdk/Contents/Home/bin/javac`
console.log(stdout)