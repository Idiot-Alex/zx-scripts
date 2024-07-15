#!/usr/bin/env zx

async function name() {
  return `python`
}

async function path() {
  try {
    const { stdout } = await $`which python`;
    return stdout.trim();
  } catch (error) {
    console.error('Python is not installed.');
    return null;
  }
}

async function version() {
  try {
    const { stdout } = await $`python --version`;
    const versionMatch = stdout.match(/Python (\S+)/);
    if (versionMatch && versionMatch[1]) {
      return versionMatch[1];
    } else {
      console.error('Failed to get Python version.');
      return null;
    }
  } catch (error) {
    console.error('Failed to get Python version.');
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