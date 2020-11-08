export interface Cask {
  token: string;
  name: string[];
  desc: null | string;
  homepage: string;
  url: string;
  appcast: null | string;
  version: string;
  sha256: string;
  artifacts: Array<Array<PurpleArtifact | string> | FluffyArtifact | string>;
  caveats: null | string;
  depends_on: DependsOn;
  conflicts_with: ConflictsWith | null;
  container: null | string;
  auto_updates: boolean | null | string;
}

export interface PurpleArtifact {
  target: string;
}

export interface FluffyArtifact {
  trash?: string[] | string;
  signal?: Signal;
  quit?: string[] | string;
  pkgutil?: string[] | string;
  rmdir?: string[] | string;
  script?: EarlyScriptClass | string;
  path?: string;
  launchctl?: string[] | string;
  delete?: string[] | string;
  args?: Args;
  early_script?: EarlyScriptClass;
  kext?: string[] | string;
  login_item?: string[] | string;
}

export interface Args {
  must_succeed: string;
  sudo: string;
  args?: string[];
  print_stdout: string;
  print_stderr?: string;
  input?: string[];
}

export interface EarlyScriptClass {
  executable: string;
  args?: string[];
  must_succeed?: string;
  print_stderr?: string;
  sudo?: string;
  input?: string[] | string;
}

export interface Signal {
  QUIT?: string;
  TERM?: string;
  KILL?: string;
  HUP?: string;
  INT?: string;
}

export interface ConflictsWith {
  cask?: string[];
  formula?: string[];
}

export interface DependsOn {
  macos?: MacOS;
  cask?: string[];
  formula?: string[];
  x11?: boolean;
  arch?: Arch[];
}

export interface Arch {
  type: string;
  bits: number;
}

export interface MacOS {
  '>='?: string[];
  '=='?: string[];
  '<='?: string[];
}
