grammar MyExpression
hidden(WS, SL_COMMENT, ML_COMMENT)

// generate exp "http://www.insa.fr/exp/Exp"


ExpArithm: (vals+=Val)* expression=EltExp;
EltExp: Literal | Add | Sub | Mult | Div | ValRef;
Literal: value=NUMBER;
Add: '+' Operands;
Sub: '-' Operands;
Mult: '*' Operands;
Div: '/' Operands;
// Should use 'name' instead of 'nameVal'. Just for illustrating the manual scoping feature
Val: 'val' nameVal=ID ':=' value=NUMBER;
ValRef: ref=[Val];

fragment Operands: leftOp=EltExp rightOp=EltExp;

terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal STRING: /"[^"]*"|'[^']*'/;

terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
terminal SL_COMMENT: /\/\/[^\n\r]*/;
terminal NUMBER: /[0-9]+(\.[0-9])?/;
