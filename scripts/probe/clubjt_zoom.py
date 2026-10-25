import json, urllib.request, sys, time
sys.path.insert(0, 'scripts/smoking')
import fetch_clubjt as f
H = f.HEADERS
out = {}
def get(url):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=H), timeout=60) as r:
            return r.read().decode()
    except Exception as e:
        return 'ERR ' + str(e)
lat, lng = 35.6896, 139.7006
for z in (10, 12, 13, 14, 15):
    tx, ty = f.tile_xy(lat, lng) if False else (None, None)
    import math
    s = math.sin(math.radians(lat)); x = (lng + 180) / 360; y = 0.5 - math.log((1 + s) / (1 - s)) / (4 * math.pi)
    tx, ty = int(x * 2**z), int(y * 2**z)
    qk = ''.join(str((1 if tx & (1 << (i - 1)) else 0) + (2 if ty & (1 << (i - 1)) else 0)) for i in range(z, 0, -1))
    for zz in (z, 16):
        u = f'https://user-api.clubjt.jp/areaSpot?tile={qk}&zoom={zz}'
        b = get(u); out[u] = {'len': len(b), 'head': b[:1500]}
        time.sleep(1.5)
u = 'https://user-api.clubjt.jp/areaSpot/tile?leftTopLat=36.2&leftTopLng=139.0&rightBottomLat=35.2&rightBottomLng=140.4&zoom=9&centerLat=35.7&centerLng=139.7&currentLat=35.7&currentLng=139.7'
b = get(u); out[u] = {'len': len(b), 'head': b[:3000]}
json.dump(out, open('probe_out.json', 'w'), ensure_ascii=False, indent=1)
