#!/usr/bin/env zx

async function name() {
  return `git`
}

async function path() {
  try {
    const { stdout } = await $`which git`;
    return stdout.trim();
  } catch (error) {
    console.error('Git is not installed.');
    return null;
  }
}

async function version() {
  try {
    const { stdout } = await $`git --version`;
    return stdout.trim().replace('git version ', '');
  } catch (error) {
    console.error('Failed to get Git version.');
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
    version: _version,
  }
}
