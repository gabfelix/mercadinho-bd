#!/bin/sh


output="schema.sql"

npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > "$output" && \
echo "Generated \"$output\" script successfully"
