import yaml from 'js-yaml';

export function parse(text) {
  return yaml.load(text);
}
