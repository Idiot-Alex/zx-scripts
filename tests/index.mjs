#!/usr/bin/env zx

import { git, jdk, maven } from '../src/index.mjs'

console.log(await git.info())
console.log(await jdk.info())
console.log(await maven.info())