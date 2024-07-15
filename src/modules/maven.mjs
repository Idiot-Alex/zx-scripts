#!/usr/bin/env zx

async function name(name) {
  return `maven`;
}

async function path() {
  try {
    const { stdout } = await $`which mvn`;
    return stdout.trim();
  } catch (error) {
    console.error('Maven is not installed.');
    return null;
  }
}

async function version() {
  try {
    const { stdout } = await $`mvn -version`;
    const versionMatch = stdout.match(/Apache Maven (\S+)/);
    if (versionMatch && versionMatch[1]) {
      return versionMatch[1];
    } else {
      console.error('Failed to get Maven version.');
      return null;
    }
  } catch (error) {
    console.error('Failed to get Maven version.');
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
