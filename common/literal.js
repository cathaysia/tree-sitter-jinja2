const { commaSep } = require('./common')

exports.rules = {
  literal: $ =>
    choice(
      $.boolean_literal,
      $.null_literal,
      $.number_literal,
      $.float_literal,
      $.list_literal,
      $.string_literal,
      $.dict_literal,
    ),
  boolean_literal: $ => choice('true', 'false'),
  null_literal: $ => choice('null', 'none'),
  number_literal: $ =>
    seq(
      optional(choice('-', '+')),
      choice(
        $.dec_literal,
        $.oct_literal,
        $.bin_literal,
        $.hex_literal,
        $.big_dec_literal,
      ),
    ),
  dec_literal: $ => /\d[\d_]*/,
  big_dec_literal: $ =>
    seq($.dec_literal, choice('e', 'e+', 'e-'), optional('_'), $.dec_literal),
  oct_literal: $ => /0[oO][0-7_]+/,
  bin_literal: $ => /0[bB][01_]+/,
  hex_literal: $ => /0[xX][\da-fA-F_]+/,
  float_literal: $ => prec(2, seq($.dec_literal, '.', $.dec_literal)),

  list_literal: $ => seq('[', commaSep($.expression), optional(','), ']'),
  dict_literal: $ =>
    seq('{', commaSep(seq($.expression, ':', $.expression)), '}'),

  string_literal: $ =>
    choice(
      seq('"', repeat(choice(/[^\"]/, '\\"')), '"'),
      seq("'", repeat(choice(/[^']/, "\\'")), "'"),
    ),
}
