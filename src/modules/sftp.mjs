#!/usr/bin/env zx

async function name() {
  return `sftp`
}

async function path() {
  try {
    const { stdout } = await $`which sftp`;
    return stdout.trim();
  } catch (error) {
    console.error('Sftp is not installed.');
    return null
  }
}

async function version() {
  return null
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