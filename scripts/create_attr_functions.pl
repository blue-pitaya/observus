#!/usr/bin/perl

use strict;
use warnings;

my $data = `./get_attributes.pl | sort`;

my %g;

while ($data =~ /(.+?)(\n|$)/g) {
  my $line = $1;
  while ($line =~ /(.+?) ; (.+?) ; (.+?)$/g) {
    push @{$g{"$1 $2"}}, $3;
  }
}

for my $k (keys %g) {
  if ($k =~ /^(.+?) (.+?)$/) {
    my $line = ""; 
    my @v = @{$g{$k}};

    if ($2 eq "string") {
      $line = "export const $1 = (v: S) => attr(\"$1\", v);";
    } 
    elsif ($2 eq "number") {
      $line = "export const $1 = (v: N) => numAttr(\"$1\", v);";
    }
    elsif ($2 eq "boolean") {
      $line = "export const $1 = (v: B) => boolAttr(\"$1\", v);";
    }
    else {
    }

    $line = "$line //@v";
    print "$line\n";
  }
}
