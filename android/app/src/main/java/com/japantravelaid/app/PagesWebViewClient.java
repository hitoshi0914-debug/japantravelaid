package com.japantravelaid.app;

import android.net.Uri;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeWebViewClient;
import java.util.Map;

/**
 * Capacitor は拡張子のないパスをすべて最初の index.html で返す（1画面アプリ向け）。
 * このアプリはページごとの HTML を同梱しているので、"/" で終わるアプリ内の URL を "…/index.html" に読み替えてから渡す。
 */
public class PagesWebViewClient extends BridgeWebViewClient {

    private final Bridge bridge;

    public PagesWebViewClient(Bridge bridge) {
        super(bridge);
        this.bridge = bridge;
    }

    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        Uri url = request.getUrl();
        String path = url.getPath();
        if (bridge.getHost().equals(url.getHost()) && path != null && path.length() > 1 && path.endsWith("/")) {
            Uri page = url.buildUpon().path(path + "index.html").build();
            return super.shouldInterceptRequest(view, new RewrittenRequest(request, page));
        }
        return super.shouldInterceptRequest(view, request);
    }

    private static final class RewrittenRequest implements WebResourceRequest {

        private final WebResourceRequest original;
        private final Uri url;

        RewrittenRequest(WebResourceRequest original, Uri url) {
            this.original = original;
            this.url = url;
        }

        @Override
        public Uri getUrl() {
            return url;
        }

        @Override
        public boolean isForMainFrame() {
            return original.isForMainFrame();
        }

        @Override
        public boolean isRedirect() {
            return original.isRedirect();
        }

        @Override
        public boolean hasGesture() {
            return original.hasGesture();
        }

        @Override
        public String getMethod() {
            return original.getMethod();
        }

        @Override
        public Map<String, String> getRequestHeaders() {
            return original.getRequestHeaders();
        }
    }
}
