#!/usr/bin/env zx

async function name() {
  return `shell`
}

async function path() {
  try {
    const { stdout } = await $`echo $SHELL`
    return stdout.trim()
  } catch (error) {
    console.error('Shell is not installed.')
    return null
  }
}

async function version() {
  try {
    const shellPath = await path()
    const { stdout } = await $`${shellPath} --version`
    return stdout.trim()
  } catch (error) {
    console.error('Failed to get Shell version.');
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