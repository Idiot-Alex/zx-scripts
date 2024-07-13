#!/usr/bin/env zx

import { git, jdk, maven, python } from '../src/index.mjs'

console.log(await git.info())
console.log(await jdk.info())
console.log(await maven.info())
console.log(await python.info())