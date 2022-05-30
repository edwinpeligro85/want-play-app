import { Pipe, PipeTransform } from '@angular/core';
import * as changeCase from 'change-case';

@Pipe({
  name: 'changeCase',
})
export class ChangeCasePipe implements PipeTransform {
  transform(value: string, typeCase: string): string {
    switch (typeCase) {
      case 'no':
        return changeCase.noCase(value); //=> "test string"
      case 'dot':
        return changeCase.dotCase(value); //=> "test.string"
      case 'path':
        return changeCase.pathCase(value); //=> "test/string"
      case 'camel':
        return changeCase.camelCase(value); //=> "testString"
      case 'param':
        return changeCase.paramCase(value); //=> "test-string"
      case 'snake':
        return changeCase.snakeCase(value); //=> "test_string"
      case 'pascal':
        return changeCase.pascalCase(value); //=> "TestString"
      case 'header':
        return changeCase.headerCase(value); //=> "Test-String"
      case 'capital':
        return changeCase.capitalCase(value); //=> "Test String"
      case 'constant':
        return changeCase.constantCase(value); //=> "TEST_STRING"
      case 'sentence':
        return changeCase.sentenceCase(value); //=> "Test string"
      default:
        return value;
    }
  }
}
