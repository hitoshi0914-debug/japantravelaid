package com.yamaguchi.japantravelaid;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // サイトはページごとの HTML（/en/medicine/ → en/medicine/index.html）なので、そのとおりに開く。
        bridge.setWebViewClient(new PagesWebViewClient(bridge));
    }
}
