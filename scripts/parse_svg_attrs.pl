#!/usr/bin/perl

use strict;
use warnings;

my $content = `cat scalatags-svg-attrs.scala.txt`;
while ($content =~ /attr\("(.+?)"\)/g) {
  my $camelCased = $1;
  $camelCased =~ s/-(\w)/ucfirst($1)/ge;

  print qq|export const $camelCased = (v: A) => attr("$1", v, "setAttrFn");\n|;
}

