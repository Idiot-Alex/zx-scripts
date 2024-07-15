#!/usr/bin/env zx

async function name() {
  return `ssh`
}

async function path() {
  try {
    const { stdout } = await $`which ssh`;
    return stdout.trim();
  } catch (error) {
    console.error('Ssh is not installed.');
    return null
  }
}

async function version() {
  try {
    const { stderr } = await $`ssh -V`;
    return stderr.trim()
  } catch (error) {
    console.error('Failed to get Ssh version.');
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