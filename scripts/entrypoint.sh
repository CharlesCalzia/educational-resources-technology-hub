#!/bin/bash
ZIMDIR=${ZIMDIR:-/zims}
LIBRARY_XML=/library.xml

touch /library.xml

for f in "$ZIMDIR"/*.zim; do
  if [[ -f "$f" ]]; then
    ( set -x; kiwix-manage "$LIBRARY_XML" add $f )
  fi
done

kiwix-serve --port 8080 --library "$LIBRARY_XML"