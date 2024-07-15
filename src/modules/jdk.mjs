#!/usr/bin/env zx

async function name(name) {
  return `java`;
}

async function path() {
  try {
    const { stdout } = await $`which java`;
    return stdout.trim();
  } catch (error) {
    console.error('JDK is not installed.');
    return null;
  }
}

async function version() {
  try {
    const { stderr } = await $`java -version`;
    const versionMatch = stderr.match(/version "([^"]+)"/);
    if (versionMatch && versionMatch[1]) {
      return versionMatch[1];
    } else {
      console.error('Failed to get JDK version.');
      return null;
    }
  } catch (error) {
    console.error('Failed to get JDK version.');
    return null;
  }
}

export async function info() {
  const _name = await name()
  const _path = await path()
  const _version = await version()
  return { 
    name: _name, 
    path: _path, 
    version: _version 
  }
}
