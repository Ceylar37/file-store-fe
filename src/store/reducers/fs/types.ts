export interface Directory {
  id: string,
  directoryId: null,
  name: string
}

export interface File {
  id: string,
  directoryId: null,
  name: string
}

export interface Fs {
  directories: Directory[],
  files: File[]
}