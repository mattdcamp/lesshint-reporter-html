'use strict';

var expect = require('chai').expect;

describe('reporter:html', () => {
  var underTest;

  beforeEach(() => {
    underTest = require('./index.js');
  });

  it('should have a report method', () => {
    expect(underTest).to.have.property('report');
    expect(underTest).to.have.property('generateReport');
    expect(underTest).to.have.property('coalateData');
  });

  describe('coalateData', () => {
    it('should merge matching file names', () => {
      var path1 = 'path/to/file1.less',
        path2 = 'path/to/file2.less',
        input = [
          {fullPath: path1},
          {fullPath: path2},
          {fullPath: path1}
        ],
        output = underTest.coalateData(input);

      expect(output[path1]).to.have.length.of(2);
      expect(output[path2]).to.have.length.of(1);
    });
  });

  describe('report', () => {
    it('should work', () => {
      var input = [
        {
          file: 'file1.less',
          fullPath: 'path/to/file1.less',
          line: 1,
          column: 5,
          linter: 'spaceBeforeBrace',
          message: 'Opening curly brace should be preceded by one space.',
          severity: 'error',
          source: '.foo{'
        },
        {
          file: 'file1.less',
          fullPath: 'path/to/file1.less',
          line: 1,
          column: 5,
          linter: 'spaceBeforeBrace',
          message: 'Opening curly brace should be preceded by one space.',
          severity: 'warning',
          source: '.foo{'
        },
        {
          file: 'file2.less',
          fullPath: 'path/to/file2.less',
          line: 1,
          column: 5,
          linter: 'spaceBeforeBrace',
          message: 'Opening curly brace should be preceded by one space.',
          severity: 'warning',
          source: '.foo{'
        }
      ];

      return underTest.report(input);
    });
  })

});
