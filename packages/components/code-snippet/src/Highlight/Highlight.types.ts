import { CSSProperties } from 'react';

export interface HighlightProps {
  languages: LanguageHighlight[];
  style?: CSSProperties;
}

export type LanguageHighlight =
  | '1c'
  | 'abnf'
  | 'accesslog'
  | 'actionscript'
  | 'ada'
  | 'angelscript'
  | 'apache'
  | 'applescript'
  | 'arcade'
  | 'arduino'
  | 'armasm'
  | 'asciidoc'
  | 'aspectj'
  | 'autohotkey'
  | 'autoit'
  | 'avrasm'
  | 'awk'
  | 'axapta'
  | 'bash'
  | 'basic'
  | 'bnf'
  | 'brainfuck'
  | 'c'
  | 'cal'
  | 'capnproto'
  | 'ceylon'
  | 'clean'
  | 'clojure-repl'
  | 'clojure'
  | 'cmake'
  | 'coffeescript'
  | 'coq'
  | 'cos'
  | 'cpp'
  | 'crmsh'
  | 'crystal'
  | 'csharp'
  | 'csp'
  | 'css'
  | 'd'
  | 'dart'
  | 'delphi'
  | 'diff'
  | 'django'
  | 'dns'
  | 'dockerfile'
  | 'dos'
  | 'dsconfig'
  | 'dts'
  | 'dust'
  | 'ebnf'
  | 'elixir'
  | 'elm'
  | 'erb'
  | 'erlang-repl'
  | 'erlang'
  | 'excel'
  | 'fix'
  | 'flix'
  | 'fortran'
  | 'fsharp'
  | 'gams'
  | 'gauss'
  | 'gcode'
  | 'gherkin'
  | 'glsl'
  | 'gml'
  | 'go'
  | 'golo'
  | 'gradle'
  | 'groovy'
  | 'haml'
  | 'handlebars'
  | 'haskell'
  | 'haxe'
  | 'hsp'
  | 'http'
  | 'hy'
  | 'inform7'
  | 'ini'
  | 'irpf90'
  | 'isbl'
  | 'java'
  | 'javascript'
  | 'jboss-cli'
  | 'json'
  | 'julia-repl'
  | 'julia'
  | 'kotlin'
  | 'lasso'
  | 'latex'
  | 'ldif'
  | 'leaf'
  | 'less'
  | 'lisp'
  | 'livecodeserver'
  | 'livescript'
  | 'llvm'
  | 'lsl'
  | 'lua'
  | 'makefile'
  | 'markdown'
  | 'mathematica'
  | 'matlab'
  | 'maxima'
  | 'mel'
  | 'mercury'
  | 'mipsasm'
  | 'mizar'
  | 'mojolicious'
  | 'monkey'
  | 'moonscript'
  | 'n1ql'
  | 'nestedtext'
  | 'nginx'
  | 'nim'
  | 'nix'
  | 'node-repl'
  | 'nsis'
  | 'objectivec'
  | 'ocaml'
  | 'openscad'
  | 'oxygene'
  | 'parser3'
  | 'perl'
  | 'pf'
  | 'pgsql'
  | 'php-template'
  | 'php'
  | 'plaintext'
  | 'pony'
  | 'powershell'
  | 'processing'
  | 'profile'
  | 'prolog'
  | 'properties'
  | 'protobuf'
  | 'puppet'
  | 'purebasic'
  | 'python-repl'
  | 'python'
  | 'q'
  | 'qml'
  | 'r'
  | 'reasonml'
  | 'rib'
  | 'roboconf'
  | 'routeros'
  | 'rsl'
  | 'ruby'
  | 'ruleslanguage'
  | 'rust'
  | 'sas'
  | 'scala'
  | 'scheme'
  | 'scilab'
  | 'scss'
  | 'shell'
  | 'smali'
  | 'smalltalk'
  | 'sml'
  | 'sqf'
  | 'sql'
  | 'stan'
  | 'stata'
  | 'step21'
  | 'stylus'
  | 'subunit'
  | 'swift'
  | 'taggerscript'
  | 'tap'
  | 'tcl'
  | 'thrift'
  | 'twig'
  | 'typescript'
  | 'vala'
  | 'vbnet'
  | 'vbscript-html'
  | 'vbscript'
  | 'verilog'
  | 'vhdl'
  | 'vim'
  | 'wasm'
  | 'wren'
  | 'x86asm'
  | 'xl'
  | 'xml'
  | 'xquery'
  | 'yaml'
  | 'zephir';
