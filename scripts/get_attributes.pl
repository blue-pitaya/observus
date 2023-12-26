#!/usr/bin/perl

use strict;
use warnings;

my $dom_types_file_path = '../node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.dom.d.ts';
die unless -e $dom_types_file_path;

my $content = `cat $dom_types_file_path`;
chomp $content;

$content =~ /interface HTMLElementTagNameMap \{(.*?)\}/gs;
my $tagTypesTxt = $1;

my @tagTypes = ();
while ($tagTypesTxt =~ /\: (.*?)\;/g) {
  push @tagTypes, $1;
}
push @tagTypes, "HTMLElement", "Element", "HTMLOrSVGElement", "ElementContentEditable";

my %seen;
my @uniqTagTypes = grep { !$seen{$_}++ } @tagTypes;

pos($content) = 0;
my @attrs;
foreach my $tag (@uniqTagTypes) {
  pos($content) = 0;
  if ($content =~ /interface $tag (.*?)\{(.*?)\}/gs) {
    my $tagBody = $2;
    #print "$tag\n---\n";
    while($tagBody =~ /([\w\d]+?)\??: (string|boolean|number);/g) {
      push @attrs, "$1 ; $2 ; $tag";
      #print "$1\n";
    }
    #print "\n";
  }
}

foreach my $a (@attrs) {
  print "$a\n";
}
